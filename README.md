  # Technorix Job Portal
  
  This project is a React-based frontend application for a job portal, designed to display job openings, allow users to view job details, and provide options for filtering, searching, and applying to jobs. It     interacts with an external API to fetch job data.
  
  ## Table of Contents
  
  -Features
  -Technologies Used
  -Project Structure
  -Known Issues
  -How to Run Locally
  
  ## Features
  
  -**Browse Job Openings:**
   View a list of available job positions, categorized by department.
  -Job Search & Filtering
  -Search for jobs by keywords.
  -Filter jobs by Department, Location, and Function.
  -Display active filters as removable chips.
  -Job Details Page
  -View comprehensive job details: title, department, location, type, experience, and full description.
  -"Apply Now" button redirects users to the external application URL.
  -"Back to Job Openings" for easy navigation.
  -Social sharing options for Facebook, LinkedIn, and Twitter.
  -**Responsive Design:**
   Layout adapts to various screen sizes for optimal experience.
  -**Loading & Error States:**
   Clear feedback to users during data fetching and error scenarios.
  -**Component-Based Architecture:**
   Built using reusable React components for better maintainability and scalability.
  
  ## Technologies Used
  
  - [React](https://react.dev/) - A JavaScript library for building user interfaces.
  - [Material UI](https://mui.com/) - A comprehensive suite of UI tools for faster and easier web development.
  - [React Router DOM](https://reactrouter.com/en/main) - Declarative routing for React.
  - Custom API Integration – Fetches job data from an external source (e.g., Jobsoid API).
  
  ## Project Structure

  job-portal-frontend/
  ├── node_modules/
  ├── public/
  ├── src/
  │   ├── components/
  │   │   ├── common/        # Reusable UI components (e.g., Loader, ErrorMessage, JobCard)
  │   │   │   ├── Loader.js
  │   │   │   ├── ErrorMessage.js
  │   │   │   └── JobCard.js
  │   │   └── filters/       # Job filtering components
  │   │       └── JobFilter.js
  │   ├── pages/             # Page-level components
  │   │   ├── JobsPage.js
  │   │   └── JobDetailsPage.js
  │   ├── utils/             # Utility functions (e.g., API calls)
  │   │   └── api.js
  │   ├── App.css
  │   ├── App.js
  │   └── index.js
  ├── .gitignore
  ├── package-lock.json
  ├── package.json
  └── README.md
  
  ## Known Issues
  
  The Jobsoid API’s filtering functionality (especially for location and department) may not work as expected.
  Although the frontend sends the correct filter parameters, the API sometimes does not return filtered results properly.
  This may require adjustments or alternative approaches for filtering on the backend/API side.
  
  ## How to Run Locally
  
  Follow these steps to set up and run the project on your local machine:
  
  1.  **Clone the repository:**
  
      git clone https://github.com/Prathamesh-Pawaskar/teknorix-job-portal.git
  
      cd teknorix-job-portal
  
  2.  **Install dependencies:**
  
      npm install
  
  3.  **Start the development server:**
  
      npm start
  
      The application will open in your browser at `http://localhost:3000`.
