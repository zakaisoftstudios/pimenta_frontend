import React from 'react'
import ReactPagination from 'react-js-pagination'
import styled from 'styled-components'

const ITEMS_COUNT_PER_PAGE = 12
const PAGE_RANGE_DISPLAYED = 5

export default class Pagination extends React.Component {
  state = {
    activePage: 1
  }

  handlePageChange = pageNumber => {
    this.setState({ activePage: pageNumber })
    this.props.handlePageChangeCallback(pageNumber)
  }

  render() {
    const { activePage } = this.state
    const { totalItemsCount } = this.props

    return this.props.children({
      paginationComponent: paginationComponent(
        activePage,
        ITEMS_COUNT_PER_PAGE,
        totalItemsCount,
        PAGE_RANGE_DISPLAYED,
        this.handlePageChange
      )
    })
  }
}

const paginationComponent = (
  activePage,
  itemsCountPerPage,
  totalItemsCount,
  pageRangeDisplayed,
  handlePageChange
) =>
  totalItemsCount > itemsCountPerPage ? (
    <PaginationWrapper>
      <ReactPagination
        activePage={activePage}
        itemsCountPerPage={itemsCountPerPage}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={pageRangeDisplayed}
        onChange={handlePageChange}
      />
    </PaginationWrapper>
  ) : null

const PaginationWrapper = styled.div`
  display: flex;
  margin-top: auto;
  width: 100%;
  justify-content: center;
`
