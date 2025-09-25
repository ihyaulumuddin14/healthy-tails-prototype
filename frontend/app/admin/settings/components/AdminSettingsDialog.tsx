import PhotoDialog from '@/app/user/profile/components/PhotoDialog'
import { Dialog } from '@/components/ui/dialog'
import { adminDialogStore } from '@/stores/adminDialogStore'
import React from 'react'
import AdminPasswordDialog from './AdminPasswordDialog'

export default function AdminSettingsDialog() {
   const dialogAdminMode = adminDialogStore((state) => state.dialogAdminMode)
   const setDialogAdminMode = adminDialogStore((state) => state.setDialogAdminMode)

   return (
      <Dialog open={dialogAdminMode !== null} onOpenChange={(open) => {
         if (!open) {
            setDialogAdminMode(null)
         }
      }}>
         {dialogAdminMode === 'adminPhoto' && <PhotoDialog/>}
         {dialogAdminMode === 'adminPassword' && <AdminPasswordDialog/>}
      </Dialog>
   )
}
