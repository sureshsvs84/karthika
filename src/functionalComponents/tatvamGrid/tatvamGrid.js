import React, {Component} from 'react';
import {BaseGrid} from "../../baseComponents";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import EditColumn from './editColumn';
import DeleteColumn from './deleteColumn';
import ColumnContextMenu from './columnMenu';
import "./tatvamGrid.css"

class TatvamGrid extends Component {
    onGridReady = (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridOptions = params.gridOptions;
        if (this.state.enableSizeToFit) {
            this.sizeToFit();
        }

        if (this.state.enableAutoHeight) {
            this.setAutoHeight();
        }

        if (this.state.enableSorting) {

        }

        if (this.state.enableEditColumn) {
            this.editColumn();
        }
        if (this.state.enableDeleteColumn) {
            this.deleteColumn();
        }

        if (this.state.enableFloatingFilter) {
            this.floatingFilter();
        }
    };
    floatingFilter = () => {
        if (!this.state.enableFloatingFilter) {
            console.error('tatvamGrid: floating filter is not enabled.');

        }
    };
    editColumn = () => {
        if (!this.state.enableEditColumn) {
            console.error('tatvamGrid: edit column is not enabled.');
            return;
        }

        if (!this.props.onRowEdit) {
            console.error('tatvamGrid: onRowEdit callback function is not defined.');
            return;
        }

        if (typeof this.props.onRowDelete !== "function") {
            console.error('tatvamGrid: onRowEdit should be a callback function.');
            return;
        }

        this.addColumn({
            headerName: "Edit",
            cellRenderer: 'EditColumn',
            filter: false,
            sortable: false,
            resizable: false,
            suppressMovable: true,
            width: 100,
            cellRendererParams: {editAction: this.props.onRowEdit}
        });
    };
    deleteColumn = () => {
        if (!this.state.enableDeleteColumn) {
            console.error('tatvamGrid: delete column is not enabled.');
            return;
        }

        if (!this.props.onRowDelete) {
            console.error('tatvamGrid: onRowDelete callback function is not defined.');
            return;
        }

        if (typeof this.props.onRowDelete !== "function") {
            console.error('tatvamGrid: onRowDelete should be a callback function.');
            return;
        }

        this.addColumn({
            headerName: "Delete",
            cellRenderer: 'DeleteColumn',
            filter: false,
            sortable: false,
            resizable: false,
            suppressMovable: true,
            width: 120,
            cellRendererParams: {deleteAction: this.props.onRowDelete}
        });
    };
    /**
     * Set new rows into the grid.
     */
    setRowData = rowData => {
        // if pagination is enabled, Set new datasource into the grid. The grid will reset all paging and load the first page.
        if (this.state.enablePagination) {
            this.gridOptions.api.setDatasource(rowData);
        } else {
            // pagination is not enabled Set new rows into the grid.
            this.gridOptions.api.setRowData(rowData);
        }
    };
    /**
     * Get the grid data
     */
    getData = () => {
        var rowData = [];
        this.gridApi.forEachNode(function (node, index) {
            rowData.push(node.data);
        });
        return rowData;
    };
    /**
     * Get the grid data after filter applied
     */
    getDataAfterFilter = () => {
        var rowData = [];
        this.gridApi.forEachNodeAfterFilter(function (node, index) {
            rowData.push(node.data);
        });
        return rowData;
    };
    /**
     * Get the grid data after filter and sort applied
     */
    getDataAfterFilterAndSort = () => {
        var rowData = [];
        this.gridApi.forEachNodeAfterFilterAndSort(function (node, index) {
            rowData.push(node.data);
        });
        return rowData;
    };
    setColumnDefs = (columnDefs) => {
        this.gridApi.setColumnDefs(columnDefs);
    };
    getColumnDefs = () => {
        return this.gridColumnApi.columnController.columnDefs;
    };
    addColumn = (column) => {
        var columnDefs = this.getColumnDefs();
        columnDefs.push(column);
        this.setColumnDefs(columnDefs);
        this.sizeToFit();
    };
    refreshView = () => {
        this.gridApi.refreshView();
    };
    onRowSelection = () => {
    };
    /**
     * Returns a list of selected rows
     */
    getSelectedRows = () => {
        return this.gridOptions.api.getSelectedRows();
    };
    setSelectedRows = () => {
    };
    selectRowByIndex = () => {
    };
    /**
     *  Select all rows (even rows that are not visible due to grouping being enabled and their groups not expanded).
     */
    selectAllRows = () => {
        this.gridOptions.api.selectAll();
        this.selectedRows = this.getSelectedRows();
    };
    /**
     * Clear all row selections.
     */
    deSelectAllRows = () => {
        this.gridOptions.api.deselectAll();
        this.selectedRows = [];
    };
    onColumnSelection = () => {
    };
    getSelectedColumns = () => {
    };
    setSelectedColumns = () => {
    };
    selectColumnByIndex = () => {
    };
    selectAllColumn = () => {
    };
    deSelectAllColumns = () => {
    };
    sizeToFit = () => {
        if (!this.state.enableSizeToFit) {
            console.error('tatvamGrid:size to fit is not enabled.');
            return;
        }
        this.gridApi.sizeColumnsToFit();
    };
    //Auto-Size All the columns
    autoSizeAll = () => {
        var allColumnIds = [];
        this.gridColumnApi.getAllColumns().forEach(function (column) {
            allColumnIds.push(column.colId);
        });
        this.gridColumnApi.autoSizeColumns(allColumnIds);
    };
    setAutoHeight = () => {
        if (!this.state.enableAutoHeight) {
            console.error('tatvamGrid: auto height is not enabled.');
            return;
        }
        this.gridApi.setDomLayout("autoHeight");
        //document.querySelector("#myGrid").style.height = "";
    };

    constructor(props) {
        super(props);
        this.state = {
            style: {
                width: '100%',
                height: '100%'
            },
            // anything specified in defaultColDef gets applied on all columns
            defaultColDef: {
                sortable: true,
                filter: true, // set filtering on for all cols
                resizable: true
            },
            frameworkComponents: {
                EditColumn: EditColumn,
                DeleteColumn: DeleteColumn,
                ColumnContextMenu: ColumnContextMenu
            },
            suppressCellSelection: true,
            enableEditColumn: true,
            enableDeleteColumn: true,
            enablePagination: true,
            enableSizeToFit: true,
            enableAutoHeight: true,
            enableFloatingFilter: true,
            rowData: this.props.gridData,
            selectedRows: [],
            headerHeight: 50,
        }
    }

    componentWillReceiveProps() {
        if (this.gridData) {

        }
    }

    setWidthAndHeight(width, height) {
        this.setState(function (oldState) {
            return Object.assign(oldState, {
                style: {
                    width: width,
                    height: height
                }
            });
        });
    }

    componentDidUpdate() {
        if (this.gridApi) {
            this.gridApi.doLayout();
        }
    }


    render() {
        return (
            <div style={{height: '100%'}}>
                <div style={{boxSizing: 'border-box', height: '100%', 'margin-bottom': '10px', 'margin-top': '10px'}}
                     className="ag-theme-material tatvam-grid">
                    <div style={this.state.style}>
                        <BaseGrid
                            defaultColDef={this.state.defaultColDef}
                            rowData={this.props.gridData}
                            columnDefs={this.props.colData}
                            frameworkComponents={this.state.frameworkComponents}
                            onGridReady={this.onGridReady.bind(this)}
                            suppressMenuHide={true}
                        />
                    </div>
                </div>
            </div>

        );
    }
}

export default TatvamGrid;