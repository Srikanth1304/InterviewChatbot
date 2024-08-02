import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notifications = ({ message }) => {
    return (
        <div className="notification">
            <p>{message}</p>
        </div>
    );
};

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get("http://172.17.15.233:5001/user/getJobs");
                console.log('Fetched jobs:', response.data);  
                setJobs(response.data); 
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setNotification('Error fetching jobs. Please try again later.');
            }
        };
        
        fetchJobs();
    }, []);  

    const handleApply = (job) => {
        console.log("Job applied");
        setNotification(`You have applied for ${job.job_role} in ${job.job_desc.Company}`);
    };

    return (
        <>
            <h2>Jobs List</h2>
            {notification && <Notifications message={notification} />} {/* Display notification if exists */}
            <ul>
                {jobs.map(job => (
                    <li key={job.job_id}>
                        <h2>Job ID:</h2> {job.job_id} <br />
                        <h2>Company ID:</h2> {job.company_id}<br />
                         <h2>Description:</h2> {job.job_desc}<br />
                        <h2>Role:</h2> {job.job_role}<br />
                        <button onClick={() => handleApply(job)}>Apply</button> 
                        {/* onClick should be a function reference, not a function call */}
                        <br />
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Jobs;
   