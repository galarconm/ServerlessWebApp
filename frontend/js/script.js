document.addEventListener('DOMContentLoaded', () => {
  fetch('https://d13shkh04iva26.cloudfront.net/getAllProjects')
    .then(response => response.json())
    .then(data => {
      // Sort the projects by relevance from lowest to highest
      data.sort((a, b) => a.relevance - b.relevance);
      
      // Get the projects container and grid
      const projectsContainer = document.getElementById('projects-container');
      const projectsGrid = document.getElementById('projects-grid');

      if (projectsContainer && projectsGrid) {
        data.forEach((project, index) => {
          // Create project container
          const projectElement = document.createElement('div');
          projectElement.classList.add('project');
          projectElement.id = `project-${index}`;
          
          // Generate the technologies list as HTML
          const technologiesList = project.keyTechnologies.map(technology => `<li>${technology}</li>`).join('');
          const featuresList = project.features.map(feature => `<li>${feature}</li>`).join('');
          
          // Get image URL
          let imageUrls = [];

          if (Array.isArray(project.imageURL)) {
            imageUrls = project.imageURL;
          } else if (typeof project.imageURL === 'string') {
            imageUrls = project.imageURL.split(',').map(url => url.trim());
          }

          const imagesHTML = imageUrls
            .map((url, index) => `<img src="${url}" alt="${project.title} Image ${index + 1}" style="max-width:100%;margin-bottom:10px;" />`)
            .join('');
          
          // Set the inner HTML of the project element
          projectElement.innerHTML = `
            <h3>${project.title}</h3>
            <p><strong>Project Overview</strong><br>${project.overview || 'No description available'}</p>
            <p><strong>Key Technologies</strong><br></p>
            <ul>${technologiesList}</ul>
            <p><strong>Features</strong><br></p>
            <ul>${featuresList}</ul>
            ${imagesHTML}
            <p><strong>Lessons Learned</strong><br>${project.lessonLearned}</p>
            <p><strong> GitHub Repository</strong><br><a href="${project.github || '#'}" target="_blank">${project.github || 'No repository available'}</a></p>
            <p><strong>Date created</strong><br>${project.date || 'Date not specified'}</p> 
          `;
          projectsContainer.appendChild(projectElement);

          // Create project card
          const projectCard = document.createElement('div');
          projectCard.classList.add('project-card');
          projectCard.setAttribute('data-target', `#project-${index}`);
          projectCard.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description || 'No description available'}</p>
          `;
          projectsGrid.appendChild(projectCard);
        });

        // Add event listeners for smooth scrolling
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
          card.addEventListener('click', () => {
            const targetId = card.getAttribute('data-target');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth' });
            }
          });
        });
      } else {
        console.error('Error: projectsContainer or projectsGrid not found');
      }
    })
    .catch(error => console.error('Error fetching projects:', error));
});

// Add JavaScript to Handle Form Submission
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

// Add JavaScript for Dynamic Transition
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a[data-transition]');

  links.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetUrl = link.getAttribute('href');

      document.body.classList.add('fade-out');

      setTimeout(() => {
        window.location.href = targetUrl;
      }, 500); // Match the duration of the CSS transition
    });
  });
});