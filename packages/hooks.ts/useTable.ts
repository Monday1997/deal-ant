import { reactive, ref } from 'vue'
// getTargetValueByKeys
import { isPromise } from '@deal-ant/utils'
import type { Ref } from 'vue'
import type { PaginationProps } from 'ant-design-vue'
import type { AxiosResponse } from 'axios'
export interface IUseTableOptions<T, K = any> {
  api: (searchForm: K) => Promise<AxiosResponse<any>>
  pagination?: PaginationProps
  searchForm?: K
  pageKey?: string
  pageSizeKey?: string
  totalKey?: string
  formatHandle?: (res: AxiosResponse<any>) => T[] | Promise<T[]>
  setSortField?: (sorter: unknown) => void
  formatSearchValue?: (searchForm?: K) => K
  formatTableSearchValue?: (page: PaginationProps) => Record<string, any>
  encryptField?: string[]
  immediate?: boolean
}

export interface ITableResult<T> {
  list: Ref<T[]>
  listLoading: Ref<boolean>
  page: PaginationProps
  getTableList: (type?: string) => any
  tableChange: (
    pagination: PaginationProps,
    _?: any,
    sorter?: unknown,
    source?: any,
    immediately?: boolean
  ) => void
  resetPagination: () => void
}

/**
 * table通用封装
 * @param options url 和 api 必须满足一条
 * @returns
 * ``` js
 const { list, listLoading, page, getTableList, tableChange } = useTable({...});
 * ```
 */
export function useTable<T, K>(options: IUseTableOptions<T, K>): ITableResult<T> {
  const list: Ref<T[]> = ref([])

  const listLoading = ref(false)

  const {
    total,
    current,
    pageSize = 10,
    showQuickJumper = true,
    showSizeChanger = true,
    pageSizeOptions,
    showTotal,
  } = options.pagination || {}
  const page = reactive<PaginationProps>({
    total: total || 0,
    current: current || 1,
    pageSize: pageSize || 10,
    showQuickJumper,
    showSizeChanger,
    pageSizeOptions: pageSizeOptions || ['10', '15', '20', '30'],
    showTotal:
      showTotal ||
      ((): string => {
        const { total, pageSize } = page
        const totalPages = Math.ceil((total as number) / (pageSize as number))
        return `共 ${page.total} 条记录  第 ${page.current} / ${totalPages} 页`
      }),
  })

  async function getTableList(type?: string) {
    if (type === 'search') {
      resetPagination()
    }
    listLoading.value = true
    try {
      const params: any = {
        ...(options.formatSearchValue
          ? options.formatSearchValue(options.searchForm)
          : options.searchForm),
        ...(options.formatTableSearchValue
          ? options.formatTableSearchValue(page)
          : {
              [options.pageKey || 'page']: page.current,
              [options.pageSizeKey || 'page_size']: page.pageSize,
            }),
      }
      const res: AxiosResponse = await options.api(params)
      if (typeof options.formatHandle === 'function') {
        const tempList = options.formatHandle(res)
        isPromise(tempList) ? (list.value = await tempList) : (list.value = tempList)
      } else {
        list.value = res.data?.list || []
      }
      page.total = res.data.otherData.total
    } catch (err) {
      return Promise.reject(err)
    } finally {
      listLoading.value = false
    }
    // 如果当前页码非第一页，且当前页已无数据重新请求
    if (list.value?.length == 0 && Number(page.current) > 1) {
      getTableList('search')
    }
  }

  function tableChange(
    pagination: PaginationProps,
    _: any,
    sorter: unknown,
    c: any,
    immediately = true
  ) {
    page.current = pagination.current || 1
    page.pageSize = pagination.pageSize || pageSize
    if (typeof options.setSortField === 'function') {
      options.setSortField(sorter)
    }
    immediately && getTableList()
  }

  function resetPagination() {
    page.current = 1
    page.pageSize = pageSize
  }

  options.immediate && getTableList()

  return {
    list,
    listLoading,
    page,
    getTableList,
    tableChange,
    resetPagination,
  }
}
