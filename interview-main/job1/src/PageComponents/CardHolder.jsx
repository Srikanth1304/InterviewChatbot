import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from './JobCard'; // Make sure the path to JobCard is correct

function CardHolder() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://example.com/api/jobs") // Replace with your API URL
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div className='flex'>
            {/* {data.map((job, index) => (
                <JobCard
                    key={index} // Use a unique key if possible
                    role={job.job_role}
                    company={job.company_id}
                    req_skills={job.job_desc}
                />
            ))} */}
            <JobCard role={"fullstack"} company={"miracle"} reqSkills={"mkjdtgy"}></JobCard>
        </div>
    );
}

export default CardHolder;
