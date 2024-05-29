'use client'

export function Modal({children, handleSubmit, toggleModal}) {
    return(
        <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box bg-white">
                {children}
            </div>
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={toggleModal}>Close</button>
                <button className="btn bg-secondary hover:bg-black text-white" type='submit' onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}