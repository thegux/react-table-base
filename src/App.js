import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import cellEditFactory from 'react-bootstrap-table2-editor';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Toggle from './toggle'

const { SearchBar, ClearSearchButton } = Search;

function App() {

  const [products, setProducts] = useState([{
    id: 0,
    name: 'Pizzas',
    price: 2.5,
    active: true,
    image: 'pizza-outline'
  }, {
    id: 1,
    name: 'Bebidas',
    price: 225,
    active: false,
    image: 'beer-outline'
  }]);

  const [selected, setSelected] = useState([])

  const submitToggle = (id) => {
    let auxItems = [...products]
    auxItems = auxItems.map((i) => {
      if (i.id === id) {
        i.active = !i.active
      }
      return i
    })
    setProducts(auxItems)
  }

  useEffect(() => {
      Array.from(document.getElementsByTagName('td')).map((i, key) => i.tabIndex = key)
  }, [document.getElementsByTagName('td')])

  const columns = [
    {
      dataField: 'active',
      text: 'Status',
      headerStyle: (colum, colIndex) => {
        return { width: '60px', textAlign: 'center' };
      },
      editable: false,
      formatter: (editorProps, value, row, column, rowIndex, columnIndex) => (<Toggle state={value.active} submitToggle={() => submitToggle(value.id)} />),
    },
    {
      dataField: 'image',
      text: 'Imagem',
      headerStyle: (colum, colIndex) => {
        return { width: '70px', textAlign: 'center' };
      },
      formatter: (editorProps, value, row, column, rowIndex, columnIndex) => (<ion-icon style={{fontSize: 70}} name={value.image}></ion-icon>),
      editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
        <QualityRanger {...editorProps} value={value} />
      )
    },
    , {
      sort: true,
      dataField: 'name',
      text: 'Nome'
    },];

  const beforeSaveCell = (oldValue, newValue, row, column, done) => {
    const itemId = row.id
    const whatToChange = column.dataField
    let auxItems = [...products]
    auxItems = auxItems.map((i) => {
      if (i.id === itemId) {
        i[whatToChange] = newValue
      }
      return i
    })

    setTimeout(() => {
      done(true);
      setProducts(auxItems)
    }, 0);
    return { async: true };
  }

  const changeMultiple = () => {
    let auxItems = [...products]
    let auxSelected = products.filter((p) => selected.includes(p.id))
    let selectedIds = auxSelected.map((i) => i.id)
    auxItems = auxItems.map((i) => {
      if (selectedIds.includes(i.id)) {
        i['name'] = 'Modificado'
      }
      return i
    })
    setProducts(auxItems)

  }

  const handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      setSelected([...selected, row.id])

    } else {
      setSelected(selected.filter(x => x !== row.id))
    }
  }

  const handleOnSelectAll = (isSelect, rows) => {
    const ids = rows.map(r => r.id);
    if (isSelect) {
      setSelected(ids)
    } else {
      setSelected([])
    }
  }


  const selectRow = {
    mode: 'checkbox',
    clickToSelect: false,
    selected: selected,
    onSelect: handleOnSelect,
    onSelectAll: handleOnSelectAll
  };

  return (
    <div className="App">
      <div className='table_container'>
        <ToolkitProvider
          keyField="id"
          data={products}
          columns={columns}
          search

        >
          {
            props => (
              <div>
                <SearchBar {...props.searchProps} />
                <ClearSearchButton {...props.searchProps} />
                <button onClick={() => changeMultiple()}> Mudar Nomes </button>
                <hr />
                <BootstrapTable
                  {...props.baseProps}
                  selectRow={selectRow}
                  cellEdit={cellEditFactory({ mode: 'click', blurToSave: true, beforeSaveCell })}
                  striped
                  hover
                  pagination={paginationFactory()}
                />
              </div>
            )
          }
        </ToolkitProvider>

      </div>
    </div>
  );

}

export default App;

class QualityRanger extends React.Component {

  getValue() {
    console.log(this.range.value)
    return this.range.value
  }

  render() {
    const { value, onUpdate, ...rest } = this.props;
    return (
      <div>
        The new image is:
        <input key="range" ref={node => this.range = node} />
        <button
          key="submit"
          className="btn btn-default"

          onClick={() => onUpdate(this.getValue())}
        >Salvar</button>
      </div>
    )
  }
}