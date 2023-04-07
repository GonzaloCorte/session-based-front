import { userRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Link } from 'components';
import { Layout } from 'components/account';
import { userService, alertService } from 'services';

export default Login;

function Login() {
    const router = userRouter();

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is quired')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit({ username, password }) {
        return userService.login(username, password)
        .then(() => {
            const returnUrl = router.query.returnUrl || '/';
            router.push(returnUrl);
        })
        .catch(alertService.error);
    }

    return (
        <Layout>
            <div className='card'>
                <h4 className='card-header'>Login</h4>
                <div className='card-body'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='form-group'>
                            <label>Username</label>
                            <input 
                                name="username" 
                                type="text" 
                                {...register('username')}
                                className={`form-control ${errors.username 
                                    ? 'is-invalid' : ''}`} 
                            />
                            <div className='invalid-feedback'>
                                {errors.username?.message}
                            </div>
                        </div>
                        <div>
                            <label>Password</label>
                            <input 
                                name="password"
                                type="password"
                                {...register('password')}
                                className={`form-control ${errors.password 
                                    ? 'is-invalid' : ''}`}
                            />
                            <div className='invalid-feedback'>
                                {errors.password?.message}
                            </div>
                        </div>
                        <button disabled={formState.isSubmitting} className='btn btn-primary'>
                            {formState.isSubmitting && <span className='spinner-border spinner-border-sm mr-1'></span>}
                            Login
                        </button>
                        
                        <p>Don't have an account?</p>
                        <Link href="/account/register" className="btn btn-link">Sign up</Link>
                    </form>
                </div>
            </div>
        </Layout>
    )
}