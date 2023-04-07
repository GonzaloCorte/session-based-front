import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup';

import { Link } from "components";
import { Layout } from 'components/account';
import { userService, alertService } from 'services';

export default Register;

function Register() {
    const router = useRouter();

    //form validation

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required')
            .email('The email is not valid'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
    });
    const formOptions = { resolver: yupResolver(validationSchema)}

    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(user) {
        return userService.register(user)
            .then(() => {
                alertService.success('Registration successful', { keepAfterRouteChange: true})
                //change to "go to your mail"
                router.push('login');
            })
            .catch(alertService.error);
    }

    return (
        <Layout>
            <div className="card">
                <h4 className="card-header">Register</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Username</label>
                            <input 
                                name="username" 
                                type="text" 
                                {...register('username')} 
                                className={`form-control ${errors.username
                                    ? 'is-invalid': ''}`}
                            />
                        </div>
                        <div>
                            <label>Password</label>
                            <input
                                name="password"
                                type="password"
                                {...register('password')}
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            />
                        </div>
                        <button disabled={formState.isSubmitting} className="btn btn-primary">
                            {formState.isSubmitting && 
                                <span className="spinner-border spinner-border-sm mr-1"></span>
                            }
                            Register
                        </button>

                        <p>Do you have an account?</p>
                        <Link href="/account/login" className="btn btn-link">Log in</Link>
                    </form>
                </div>
            </div>
        </Layout>
    );
}