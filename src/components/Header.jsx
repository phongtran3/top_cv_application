import React, {useState, useEffect} from 'react'
import EditButton from './editButton';
import EditHeader from './EditHeader';

const Header = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [headerData, setHeaderData] = useState(() => {
    const storedData = localStorage.getItem("headerData");
    return storedData ? JSON.parse(storedData) : 
      {
        name: 'Phong Tran',
        phoneNumber: '(123)-456-7890',
        email: 'phongtran230@gmail.com',
        linkedIn: 'linkedin.com/in/phong-tran230/',
        github: 'github.com/phongtran3'
      }
  })
  
  const handleEditClick = () => {
    console.log("Editing");
    setIsEditing(true);
  }

  const handleCancelClick = () => {
    console.log("Canceling");
    setIsEditing(false);
  }

  const handleSave = (updatedData) => {
    console.log("Saving");
    setHeaderData(updatedData);
    setIsEditing(false);
  }

  useEffect(() => {
    localStorage.setItem("headerData", JSON.stringify(headerData));
  }, [headerData]);


  return (
    <header className="resume-header">
      {!isEditing ? <EditButton onClick={handleEditClick}/> : null}

      {!isEditing ? 
      <>
        <h1>{headerData.name}</h1>
        <div className="header-data">
          <span>
            {headerData.phoneNumber} | 
              <a href={`mailto:${headerData.email}`} target="_blank" rel="noopener noreferrer"> {headerData.email} | </a>
              <a href={`http://${headerData.linkedIn}`} rel="noopener noreferrer" target="_blank"> {headerData.linkedIn} | </a>
              <a href={`http://${headerData.github}`} rel="noopener noreferrer" target="_blank"> {headerData.github}</a>
          </span>
        </div>
      </> : 
      <>
        <EditHeader data={headerData} onSave={handleSave} onCancel={handleCancelClick} />
      </>}
      
    </header>
  )
}

export default Header;

