import { useState } from 'react';
import './App.css';
import * as xlsx from "xlsx"

function App() {
  const [excelFile, setExcelFile] = useState()

  const refFileTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel', 'text/csv']

  const fetchData = (e) => {
    const file = e.target.files[0]

    if(file && refFileTypes.includes(file.type)) {
      const readFile = new FileReader();
      readFile.readAsArrayBuffer(file)
      readFile.onload=(e)=>{
        setExcelFile(e.target.result)
      }
    }
  }

  const fileSubmit = (e) => {
    e.preventDefault();
    const workBook = xlsx.read(excelFile, {type: 'buffer'})
    const sheetName = workBook.SheetNames[0]
    const sheet = workBook.Sheets[sheetName]
    const outputData = xlsx.utils.sheet_to_json(sheet)
    console.log(outputData);
  }

  return (
    <div className="App">
      <form onSubmit={fileSubmit}>
        <input type='file'className='upload' required onChange={fetchData} />
        <button type="submit" className='submit-button'>Submit</button>
      </form>
    </div>
  );
}

export default App;
