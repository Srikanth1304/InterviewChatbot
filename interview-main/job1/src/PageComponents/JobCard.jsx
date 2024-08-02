import { useState } from "react";

function JobCard({ role, company, reqSkills, text }) {
  const [applied, setApplied] = useState(false);
  const [btnData, setBtnData] = useState("Apply Now");
  function handleClick(){
   
      console.log("clicked");
      setApplied(true);
      setBtnData("Applied");
      text(applied);
    
  }
  return (
    <div className="card bg-base-100 w-96 shadow-xl bg-slate-200">
      <div className="card-body text-black">
        <h2 className="card-title">{role}!</h2>
        <p>Company: {company}</p>
        <p>Required skills : {reqSkills}</p>
        <div className="card-actions justify-end pt-3">
          <button
            className={`border-solid rounded-md w-28 h-12 ${
              !applied
                ? "text-cyan-50 bg-blue-950"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={handleClick}
          >
            {btnData}
          </button>
        </div>
      </div>
    </div>
  );
}
export default JobCard;
