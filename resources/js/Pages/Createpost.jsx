import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {useState} from "react";
import { router } from '@inertiajs/react' // We need to import this router for making POST request with our form

export default function Createpost ({auth, posts}) {

    console.log(posts)

    const [values, setValues] = useState({ // Form fields
        title: "",
        body: ""
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    // This function will send our form data to
    // store function of PostContoller
    function handleSubmit(e) {
        e.preventDefault()
        console.log(values);

        router.post('/post', values)
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Post</h2>}
        >
            <Head title="Create post"/>
            <h1>Create Post</h1>
            <hr/>
            <form onSubmit={handleSubmit}>
                {/* Pay attention how we create here input fields */}
                <label htmlFor="title">Title:</label>
                <input id="title" value={values.title} onChange={handleChange}/>

                <label htmlFor="body">Body:</label>
                <textarea id="body" value={values.body} onChange={handleChange}></textarea>
                <button type="submit">Create</button>
            </form>

            {
                posts?.map((post, index) => (
                    <div className={'mt-5'}>
                        <hr/>
                        <h2>{post.title}</h2>
                        <hr/>
                    </div>
                ))
            }
        </AuthenticatedLayout>
    )
}
