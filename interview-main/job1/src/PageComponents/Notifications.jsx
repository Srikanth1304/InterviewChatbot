
function Notify({text}) {
  return (
    <div className="flex">
      <div className="flex  ml-1 justify-center border-2 border-b-slate-400 w-1/6">
        <div className=" text-black">Applied:</div>
        if(text)? <div className="ml-8 ">YES</div> :<div className="ml-8 ">YES</div>
      </div>
      <div className="flex  ml-1 justify-center border-2 border-b-slate-400 w-1/6">
        <div className=" text-black">Resume shortlisted:</div>
        <div className="ml-8 ">YES</div>
      </div>
      <div className="flex  justify-center  ml-1 border-2 border-b-slate-400 w-1/6">
        <div className=" text-black">Inetrview Status:</div>
        <div className="ml-8 ">YES</div>
      </div>
      <div className="flex  justify-center   ml-1 border-2 border-b-slate-400 w-1/6">
        <div className=" text-black">Selected:</div>
        <div className="ml-8 ">YES</div>
      </div>
    </div>
  );
}
export default Notify;
