document.addEventListener('DOMContentLoaded', () => {
    fetch('https://d13shkh04iva26.cloudfront.net/getAllProjects')
      .then(response => response.json())
      .then(data => {
        // Sort the projects by relevance from lowest to highest
        data.sort((a, b) => a.relevance - b.relevance);
        
        // Get the projects container
        const projectsContainer = document.getElementById('projects-container');
        data.forEach(project => {
          const projectElement = document.createElement('div');
          projectElement.classList.add('project');
          
          // Generate the technologies list as HTML
          const technologiesList = project.keyTechnologies.map(technology => `<li>${technology}</li>`).join('');
          const featuresList = project.features.map(feature => `<li>${feature}</li>`).join('');

          // Get image URL
          const images = project.imageURL;
          
          // Set the inner HTML of the project element
          projectElement.innerHTML = `
            <h3>${project.title}</h3>
            <p><strong>Project Overview</strong><br>${project.overview || 'No description available'}</p>
            <p><strong>Key Technologies</strong><br></p>
            <ul>${technologiesList}</ul>
            <p><strong>Features</strong><br></p>
            <ul>${featuresList}</ul>
            <img src=${images} alt="${project.title}" />
            <p><strong>Lessons Learned</strong><br>${project.lessonLearned}</p>
            <p><strong>Date created</strong><br>${project.date || 'Date not specified'}</p> 
          `;
          projectsContainer.appendChild(projectElement);
        });
      })
      .catch(error => console.error('Error fetching projects:', error));
  });

//Add JavaScript to Handle Form Submission
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const formObject = Object.fromEntries(formData);
      try {
        const response = await fetch('https://d13shkh04iva26.cloudfront.net/contactMessage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formObject),
        });
        if (response.ok) {
          alert('Message sent successfully');
          form.reset();
        } else {
          alert('Failed to send message');
        }
      } catch (error) {
        console.error('Error sending message:', error);
        alert('Failed to send message');
      }
    });
  });
