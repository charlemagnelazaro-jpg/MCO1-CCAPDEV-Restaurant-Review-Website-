import React, { useState } from 'react';
import Logo from '../assets/logo.png'
import ProfileIcon from '../assets/profile.png'
import SearchBar from './SearchBar';
import { Button } from './ui/button';
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

const Navbar = () => {
  const { user, login, register, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Login State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register State
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const result = login(loginEmail, loginPassword);
    if (result.success) {
      setIsOpen(false);
      // Reset form
      setLoginEmail("");
      setLoginPassword("");
    } else {
      alert(result.message);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (regPassword !== regConfirm) {
      alert("Passwords do not match");
      return;
    }
    const result = register(regEmail, regPassword);
    if (result.success) {
      setIsOpen(false);
      // Reset form
      setRegEmail("");
      setRegPassword("");
      setRegConfirm("");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-gray-50 h-15 px-6 flex items-center border-b-2 z-50">
      <div className="flex justify-between items-center w-full">

        <Link to="/">
          <div className="flex items-center gap-2 ">
            <img className="rounded-lg bg-white" src={Logo} width="32px" alt="Logo" />
            <p>ArcherEats</p>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <SearchBar />

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

                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-4">
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

          <Link to="/profile" className="flex-shrink-0">
            <img src={ProfileIcon} width='24px' alt="Profile" />
          </Link>

        </div >
      </div >
    </div >
  );
};

export default Navbar;
