'use client';

import { FormEvent, useState } from 'react';

export default function SignIn() {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [loading, setLoading] = useState(false)
      const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
            setLoading(true)
            e.preventDefault();
            console.log({ email, password });
      };

      return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                  <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
                        <h2 className="text-2xl font-bold text-center text-gray-900">Sign in</h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                              <div>
                                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <input
                                          type="email"
                                          value={email}
                                          onChange={(e) => setEmail(e.target.value)}
                                          required
                                          className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                                    />
                              </div>
                              <div>
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    <input
                                          type="password"
                                          value={password}
                                          onChange={(e) => setPassword(e.target.value)}
                                          required
                                          className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                                    />
                              </div>
                              <button
                                    type="submit"
                                    className="w-full p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                              >
                                    {loading ? <div></div> : "Sign In"}
                              </button>
                        </form>
                  </div>
            </div>
      );
}