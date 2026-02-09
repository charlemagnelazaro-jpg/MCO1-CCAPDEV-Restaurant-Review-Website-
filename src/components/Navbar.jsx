import React, { useId } from 'react';
import Logo from '../assets/logo.png'
import ProileIcon from '../assets/profile.png'
import SearchBar from './SearchBar';
import { Button } from './ui/button';
import { Link } from 'react-router-dom'
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
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const Navbar = () => {
  const id = useId();
  return (
    <div className="fixed top-0 left-0 right-0 bg-gray-50 h-15 px-6 flex items-center border-b-2 z-50">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center  gap-2">
          <Link to="/">
            <img src={Logo} width='32px' />
          </Link>
          <p>ArcherEats</p>
        </div>
        <div className="flex items-center gap-4">
          <SearchBar ></SearchBar>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="font-bold border-2 border-black">Log In</Button>
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
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" placeholder="hi@yourcompany.com" type="email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" placeholder="Enter your password" type="password" required />
                    </div>
                    <div className="flex justify-end">
                      <a className="text-sm underline hover:no-underline" href="#">
                        Forgot password?
                      </a>
                    </div>
                    <Button type="button" className="w-full">
                      Login
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input id="register-email" placeholder="hi@yourcompany.com" type="email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <Input id="register-password" placeholder="Create a password" type="password" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input id="confirm-password" placeholder="Confirm your password" type="password" required />
                    </div>
                    <Button type="button" className="w-full">
                      Register
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>

          <Link to="/profile">
            <img src={ProileIcon} width='32px' />
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
