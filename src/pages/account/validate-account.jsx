import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRouter } from 'next/router';

import { Spinner } from '@/components';

export default ValidateAccount;

function ValidateAccount() {
    const router = useRouter();
    const { pathname, query } =  router;
    console.log("query");
    console.log(query);

    const [validated, setValidated] = useState(false);

    useEffect(() => {
        const configuration = {
            method: "post",
            url: "http://localhost:3000/email-validation/validate-email-token",
            headers: {
                Authorization: `Bearer ${token}`,
              },
            // data: {
            //   token: "token"
            // },
        };

        axios(configuration)
          .then((result) => {
            setValidated(true);
            setTimeout(useRouter.push('/login'), 3000);
          })
    },[]);
    return (
        <div>
        { !validated 
        ? (<tr>
            <td colSpan="4">
                <Spinner />
            </td>
            </tr> 
        ) : (
            <>
            <p>Congrats! You have validated your account</p>
            </>
        )
        }
        </div>
    )
}