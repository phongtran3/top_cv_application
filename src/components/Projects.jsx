import React, {useState, useEffect} from 'react'
import EditProject from './EditProject';
import EditButton from './editButton';

const Projects = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [projectData, setProjectData] = useState(() => {
    const storedData = localStorage.getItem("projectData");
    return storedData ? JSON.parse(storedData) : 
    [
      {
        id: 0,
        title: 'myAnimeLibrary',
        projectLink: 'https://myanimelibrary.netlify.app/',
        projectCode: 'https://github.com/phongtran3/myAnimeLibrary',
        dateRange: 'February 2023 - September 2023 ',
        bullets: [
          'Developed a social networking and social cataloging application allowing users to create and view personalized anime/manga lists, utilizing the MERN stack.',
          'Incorporated the AniList GraphQL API, facilitating rapid access to a database of over 500,000 anime and manga entries',
          'Implemented RESTful API to handle GET, POST, PATCH, or DELETE requests from the application.',
          'Implemented AWS S3 integration in a Node.js application, enabling secure and efficient storage of user-uploaded assets.'
        ]
      },
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
    setProjectData(updatedData);
    setIsEditing(false);
  }

  useEffect(() => {
        localStorage.setItem("projectData", JSON.stringify(projectData));
    }, [projectData]);


  return (
    <section className='resume-section'>
      <div className="section-header">
        <h1 className='section-title'>Project</h1>
        {!isEditing ? <EditButton onClick={handleEditClick}/> : null}
        
      </div>

      {!isEditing ? 
      <>
        <hr></hr>
        {projectData.map(project => (
          <div className="section-body" key={project.id}>
            <div className="section-entry">
            <div className="entry-header">
              <h2 className='entry-title'>{project.title}</h2>
              <div className='project-links'>
                <a href={project.projectLink} target="_blank" rel="noopener noreferrer">Live</a>
                <a href={project.projectCode} target="_blank" rel="noopener noreferrer">Code</a>
              </div>
              <span className='entry-date-range'>{project.dateRange}</span>
            </div>
            <ul className="entry-bullets">
              {project.bullets.map((bullet, index) => (
                <li className='entry-bullet' key={index}>{bullet}</li>
              ))}
            </ul>
            </div>
          </div>
        ))}

       
      </> :
      <EditProject data={projectData} onSave={handleSave} onCancel={handleCancelClick}/>
    }

    </section >
  )
}

export default Projects
