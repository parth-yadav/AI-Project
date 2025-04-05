// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useAuth } from '../../lib/auth';

// const loginSchema = z.object({
//   email: z.string().email('Invalid email address'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
// });

// type LoginFormData = z.infer<typeof loginSchema>;

// export default function LoginForm() {
//   const { signIn } = useAuth();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<LoginFormData>({
//     resolver: zodResolver(loginSchema),
//   });

//   const onSubmit = async (data: LoginFormData) => {
//     await signIn(data.email, data.password);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-nofex font-bold">
//             Sign in to Admin Panel
//           </h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="email" className="sr-only">
//                 Email address
//               </label>
//               <input
//                 {...register('email')}
//                 type="email"
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-wolf-light/20 placeholder-wolf-light/50 text-wolf-light rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm bg-transparent"
//                 placeholder="Email address"
//               />
//               {errors.email && (
//                 <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
//               )}
//             </div>
//             <div>
//               <label htmlFor="password" className="sr-only">
//                 Password
//               </label>
//               <input
//                 {...register('password')}
//                 type="password"
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-wolf-light/20 placeholder-wolf-light/50 text-wolf-light rounded-b-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm bg-transparent"
//                 placeholder="Password"
//               />
//               {errors.password && (
//                 <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
//               )}
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-wolf-dark bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
//             >
//               {isSubmitting ? 'Signing in...' : 'Sign in'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
