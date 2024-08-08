'use client'

export function Modal({id, name, children, handleSubmit}) {
    return(
        <dialog id={id} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box bg-white">
                <h3 className="text-md text-center mb-4">{name}</h3>
                <form className="grid grid-cols-1 gap-6">
                    {children}
                </form>
                <div className="modal-action">                    
                <form method="dialog">
                    <button className="btn btn-ghost">Close</button>
                </form>
                <button className="btn bg-secondary hover:bg-black text-white" type='submit' onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </dialog>
    )
}