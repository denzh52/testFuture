import React from 'react'
import ReactPaginate from 'react-paginate'
import Loader from './Loader/Loader'
import DetailRowView from './DetailRowView/DetailRowView'
import Table from './Table/Table'
import ModeSelector from './ModeSelector/ModeSelector'
import TableSearch from './TableSearch/TableSearch'
import _ from 'lodash'

class App extends React.Component {
 state = {
   MDselected:false,
	loadfix:true,
	data:[],
   sort:'asc',
   Sorting: 'id',
   row:null,
   currentPage:0,
   search:''
 }
	async fetchData(url){
        const response =  await fetch(url)
        const data = await response.json()
        this.setState({
					loadfix:false,
					data:_.orderBy(data, this.state.Sorting, this.state.sort)

				})
	}

	onSort = Sorting => {
	const clonedData = this.state.data.concat()
    const sort = this.state.sort === 'asc' ? 'desc' : 'asc'
    const data=_.orderBy(clonedData, Sorting, sort)
    this.setState ({
      data,
      sort,
      Sorting
    })
	}
modeSelectCoach = url =>{
  this.setState({
    MDselected:true,
    loadfix:true
  })

  this.fetchData(url)
}

  onRowSelect = row =>{
    this.setState({row})
  }

  pageChangeCoach = ({selected}) => {
    this.setState({currentPage: selected})
  }

  searchCoach=search =>{
    this.setState({search, currentPage:0})
  }
  getFilteredData() {
    const {data, search} = this.state

    if (!search) {
      return data
    }

    return data.filter(item => {
      return item['firstName'].toLowerCase().includes(search.toLowerCase())
        || item['lastName'].toLowerCase().includes(search.toLowerCase())
        || item['email'].toLowerCase().includes(search.toLowerCase())
    })
  }
    render() {
      const pageSize = 50
      const filteredData = this.getFilteredData()
      const pageCount = Math.ceil(filteredData.length / pageSize)
      const displayData = _.chunk(filteredData, pageSize)[this.state.currentPage]

      if (!this.state.MDselected) {
      return (
       <div className="container">
        <ModeSelector onSelect={this.modeSelectCoach}/>
       </div>
     )
   }

      return (
        <div className="container">
					{
						this.state.loadfix
							? <Loader/>
							:<React.Fragment>
              <TableSearch onSearch={this.searchCoach} />
              <Table
								data={displayData}
								onSort = {this.onSort}
                sort={this.state.sort}
                Sorting={this.state.Sorting}
                onRowSelect={this.onRowSelect}
							/>
               </React.Fragment>
					}
          {
          this.state.data.length > pageSize
            ? <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.pageChangeCoach}
            containerClassName={'pagination'}
            activeClassName={'active'}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            nextClassName="page-item"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
            forcePage={this.state.currentPage}
          /> : null
        }
          {
            this.state.row
            ? <DetailRowView  person={this.state.row}/>
            : null
          }

        </div>
       );
    }
  }
export default App;
