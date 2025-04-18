import React, {useState, useEffect} from 'react'
import EditButton from './editButton'
import EditExperience from './EditExperience'

const Experience = () => {
  const [isEditing, setIsEditing] = useState(false);


  const [expData, setExpData] = useState(() => {
    const storedData = localStorage.getItem("expData");
    return storedData ? JSON.parse(storedData) : 
    [
      {
        id: 0,
        title: 'E-commerce Support Associate',
        company: 'Best Cheer Stone',
        dateRange: 'June 2024 - Present',
        location: 'Denton, TX',
        bullets: [
          'Process and manage intercompany transfer orders, ensuring accurate and timely movement of goods between company entities.',
          'Utilize Jet Reports for weekly inventory management, generating real-time reports to track stock levels and purchasing trends.',
          'Generate shipping labels and booked freight for LTL and PTL shipments, optimizing logistics costs.',
          'Assist customers with sales order inquiries, reviewing and releasing orders in Microsoft Dynamics NAV, ensuring item availability and readiness for fulfillment.'
        ]
      },
      {
        id: 1,
        title: 'Assistant Store Manager',
        company: '7 Leaves Cafe',
        dateRange: 'May 2021 - July 2024',
        location: 'Carrollton, TX',
        bullets: [
          'Supervise team members ensuring all duties and tasks are completed efficiently and adequately during each shift.',
          'Conducted biweekly inventory count and supply audits to generate insights into purchasing decisions.',
          'Operated POS cash register, handling 50+ customer transactions on average per shift, upselling to increase customer total sales by up to 15%.'
        ]
      }
    ]
  })

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleCancelClick = () => {
    console.log("Canceling");
    setIsEditing(false);
  }

  const handleSave = (updatedData) => {
    console.log("Saving");
    setExpData(updatedData);
    setIsEditing(false);
  }

  useEffect(() => {
      localStorage.setItem("expData", JSON.stringify(expData));
  }, [expData]);

  return (
    <section className='resume-section'> 
      <div className="section-header">
        <h1 className='section-title'>Experience</h1>
        {!isEditing ? <EditButton onClick={handleEditClick}/> : null}

      </div>

      {!isEditing ? 
      <>
        <hr></hr>
        {expData.map(exp => (
          <div className="section-body" key={exp.id}>
            <div className="section-entry">
            <div className="entry-header">
              <h2 className='entry-title'>{[exp.company, exp.title, exp.location].filter(Boolean).join(', ')}</h2>
              <span className='entry-date-range'>{exp.dateRange}</span>
            </div>
            <ul className="entry-bullets">
              {exp.bullets.map((bullet, index) => (
                <li className='entry-bullet' key={index}>{bullet}</li>
              ))}
            </ul>
            </div>
          </div>
        ))}

        {/* <div className="section-body">
          <div className="section-entry">
            <div className="entry-header">
              <h2 className='entry-title'>{eduData.institution}</h2>
              <span className='entry-date-range'>{eduData.dateRange}</span>
            </div>
            <h3 className='entry-subtitle'>{eduData.degree}</h3>
            <p className='entry-location'>{eduData.location}</p>
          </div>
        </div> */}
      </> :
      <EditExperience data={expData} onSave={handleSave} onCancel={handleCancelClick}/>
    }

    
    </section>
  )
}

export default Experience
