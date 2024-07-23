import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AllMail = () => {
    const [mails, setMails] = useState([]);

    useEffect(() => {
        const fetchMails = async () => {
            try {
                const result = await axios.get('http://localhost:3000/api/getmail');
                setMails(result.data);
            } catch (error) {
                console.error('Error fetching mails:', error);
            }
        };

        fetchMails();
    }, []);

    console.log(mails);

    return (
       

<div className='rounded overflow-hidden h-auto flex flex-col gap-4 w-[80%] mx-auto'>
    <h2 className="text-2xl font-bold mb-4">All Mails</h2>
    {mails?.map((items, index) => {
        return (
            <div key={index} className="p-2 bg-gray-100 rounded-lg w-full">
                <h3 className="font-bold text-lg mb-2">To: {items.to}</h3>
                <p className="text-gray text-base">
                    <span className="font-bold">Subject:</span> {items.subject}
                </p>
                <p className="text-gray text-sm mt-1">
                    <span className="font-bold">Description:</span> {items.body}
                </p>
                {/* You can add more details like date, sender, etc. here */}
            </div>
        )
    })}
</div>


    );
}

export default AllMail;
