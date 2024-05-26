import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Settings } from 'lucide-react'
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"

const SettingsComp = () => {
    return (
        <Dialog>
            <DialogTrigger asChild >
                <div className='flex items-center gap-[20px] !select-none text-[0.9rem] py-[8px] px-[10px]'>
                    <Settings size={20} color='#344054' />
                    Settings
                </div>
            </DialogTrigger>
            <DialogContent className="bl:max-w-[min(85vw,1050px)] bl:h-[min(85vh,600px)] !rounded-[15px] flex !p-[0px]">
                <div className="w-[22%] h-[100%] overflow-y-auto bg-[#fbfbfa] rounded-l-[15px]">

                </div>
                <div className='w-[78%] overflow-y-auto'>

                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SettingsComp


const DialogOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
            "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
        )}
        {...props}
    />
))

const DialogContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <DialogPrimitive.DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
            ref={ref}
            className={cn(
                "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
                className
            )}
            {...props}
        >
            {children}
        </DialogPrimitive.Content>
    </DialogPrimitive.DialogPortal>
))