import React, { useState } from 'react';
import Logo from '../assets/logo_transparent.png'
import ProfileIcon from '../assets/profile.png'
import SearchBar from './SearchBar';
import { Button } from './ui/button';
import { AddRestaurant} from './addRestoButton';
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from './badge-2'
import { Checkbox } from "@/components/ui/checkbox"

const Navbar = () => {
  const { user, login, register, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Login State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");

  // Register State
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [registerAsOwner, setRegisterAsOwner] = useState(false);
  const [regRestaurantID, setRegRestaurantID] = useState("");
  const [regName, setRegName] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(loginEmail, loginPassword);
    if (result.success) {
      setIsOpen(false);
      setLoginEmail("");
      setLoginPassword("");
      setError("");
    } else {
      setError(result.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (regPassword !== regConfirm) {
      setError("Passwords do not match.");
      return;
    }
    const result = await register(regEmail, regPassword, registerAsOwner,regRestaurantID, regName);
    if (result.success) {
      setIsOpen(false);
      setRegEmail("");
      setRegPassword("");
      setRegConfirm("");
      setRegisterAsOwner(false);
      setRegRestaurantID("");
      setRegName("");
      setError("");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-gray-50 h-15 px-6 flex items-center border-b-2 z-50">
      <div className="flex justify-between items-center w-full mx-5">

        <Link to="/">
          <div className="flex items-center gap-2 ">
            <img className="rounded-lg" src={Logo} width="32px" alt="Logo" />
            <p className='font-bold'>ArcherEats</p>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          {user?.role === "admin" && (
            <div className="flex items-center gap-4">
              <AddRestaurant />
            </div>
          )}
          {user?.role !== 'owner' && (<SearchBar />)}
          {!user ? (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="font-bold border-1 border-black">Log In</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <div className="flex flex-col items-center gap-2 mb-2">
                  <div
                    className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
                    aria-hidden="true"
                  >
                    <img src={Logo} alt="ArcherEats Logo" className="h-6 w-6" />
                  </div>
                  <DialogHeader>
                    <DialogTitle className="sm:text-center">Welcome back</DialogTitle>
                    <DialogDescription className="sm:text-center">
                      Login or Register to access your account.
                    </DialogDescription>
                  </DialogHeader>
                </div>

                <Tabs defaultValue="login" className="w-full" onValueChange={() => setError("")}>
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-4">
                      {error && (
                        <div className="text-red-500 text-sm font-medium text-center">
                          {error}
                        </div>
                      )}
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          placeholder="hi@yourcompany.com"
                          type="email"
                          required
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          placeholder="Enter your password"
                          type="password"
                          required
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                        />
                      </div>

                      <div className="flex justify-end">
                        <a className="text-sm underline hover:no-underline" href="#">
                          Forgot password?
                        </a>
                      </div>
                      <Button type="submit" className="w-full">
                        Login
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="register">
                    <form onSubmit={handleRegister} className="space-y-4">
                      {error && (
                        <div className="text-red-500 text-sm font-medium text-center">
                          {error}
                        </div>
                      )}
                      <div className="space-y-2">
                        <Label htmlFor="register-email">Email</Label>
                        <Input
                          id="register-email"
                          placeholder="hi@yourcompany.com"
                          type="email"
                          required
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-password">Password</Label>
                        <Input
                          id="register-password"
                          placeholder="Create a password"
                          type="password"
                          required
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input
                          id="confirm-password"
                          placeholder="Confirm your password"
                          type="password"
                          required
                          value={regConfirm}
                          onChange={(e) => setRegConfirm(e.target.value)}
                        />
                      </div>
                      {registerAsOwner && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="owner-name">Name</Label>
                            <Input
                              id="owner-name"
                              placeholder="Enter your name"
                              type="text" 
                              required
                              value={regName}
                              onChange={(e) => setRegName(e.target.value)}         
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="restaurant-id">Enter Restaurant ID</Label>
                            <Input
                              id="restaurant-id"
                              placeholder="Enter your restaurant ID"
                              type="text" 
                              required
                              value={regRestaurantID}
                              onChange={(e) => setRegRestaurantID(e.target.value)}         
                            />
                          </div>
                        </div>
                      )}
                      <label
                        htmlFor="register-restaurant-account"
                        className={`flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3 shadow-sm cursor-pointer transition-colors ${registerAsOwner ? 'bg-primary/5 border-primary/50' : 'hover:bg-gray-50'}`}
                      >
                        <Checkbox
                          id="register-restaurant-account"
                          checked={registerAsOwner}
                          onCheckedChange={(checked) => setRegisterAsOwner(checked === true)}
                          className="mt-1"
                        />
                        <div className="space-y-1 leading-none">
                          <p className="text-sm font-medium leading-none">
                            Register as a Restaurant Owner
                          </p>
                          <p className="text-sm text-gray-500">
                            Create a page for your restaurant to interact with diners.
                          </p>
                        </div>
                      </label>
                      <Button type="submit" className="w-full">
                        Register
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          ) : (
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="hidden md:inline-flex h-auto whitespace-nowrap px-4 py-1.5 text-sm font-medium border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors gap-1">
                <span className="text-muted-foreground">Hi, {user.name}</span>
              </Badge>
              <Button onClick={logout} variant="outline" className="font-bold border-1 border-black">Log Out</Button>
            </div>
          )}
          {(user?.role !== 'admin' && user?.role !== 'owner') && (
            <Link to="/profile" className="flex-shrink-0">
              <img src={ProfileIcon} width='24px' alt="Profile" />
            </Link>
          )}
        </div >
      </div >
    </div >
  );
};

export default Navbar;
