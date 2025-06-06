import { Foto, Response } from '@/app/types'
import { settingsStore } from '@/store/settingsStore'
import { z } from 'zod'
import { encryptText } from './general'

const { setError } = settingsStore.getState()

export const fotosSchema = z.object({
  frontal: z.string().optional().nullable(),
  trasera: z.string().optional().nullable(),
  derecha: z.string().optional().nullable(),
  izquierda: z.string().optional().nullable(),
  superior: z.string().optional().nullable(),
  interior: z.string().optional().nullable()
})

export const fotosUpdateSchema = fotosSchema.partial().strict()

export const newFotos = async (fotos: Foto, clientKey: string) => {
  try {
    const response = await fetch('api/fotos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'client-key': encryptText(clientKey, 'vinicarJOSEJEREMYXD')
      },
      body: JSON.stringify(fotos)
    })

    const data: Response<Foto> = await response.json()
    if (data.code !== 200) {
      setError(data.message)
      console.error('Error creating fotos:', data.message)
      return
    }

    console.info(data.message)
    return data.data

  } catch (error) {
    setError('Error interno del servidor. Por favor intente de nuevo más tarde.')
    console.error('Error creating fotos:', error)
  }
}

export const createFotos = async (id: number, fotos: Omit<Foto, 'id'>, clientKey: string) => {
  try {
    const response = await fetch(`api/orden/${id}/fotos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'client-key': encryptText(clientKey, 'vinicarJOSEJEREMYXD')
      },
      body: JSON.stringify(fotos)
    })

    const data: Response<Foto> = await response.json()
    if (data.code !== 200) {
      setError(data.message)
      console.error('Error creating fotos:', data.message)
      return
    }

    console.info(data.message)
    return data.data

  } catch (error) {
    setError('Error interno del servidor. Por favor intente de nuevo más tarde.')
    console.error('Error creating fotos:', error)
  }
}


export const editFotos = async (id: number, fotos: Omit<Foto, 'id'>, clientKey: string) => {

  try {
    const response = await fetch(`api/orden/${id}/fotos`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'client-key': encryptText(clientKey, 'vinicarJOSEJEREMYXD')
      },
      body: JSON.stringify(fotos)
    })

    const data: Response<Foto> = await response.json()
    if (data.code !== 200) {
      setError(data.message)
      console.error('Error updating order:', data.message)
      return
    }

    console.info(data.message)
    return data.data

  } catch (error) {
    setError('Error interno del servidor. Por favor intente de nuevo más tarde.')
    console.error('Error updating order:', error)
  }

}

export const deleteFotos = async (id: number, clientKey: string) => {
  try {
    const response = await fetch(`api/orden/${id}/fotos`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'client-key': encryptText(clientKey, 'vinicarJOSEJEREMYXD')
      }
    })

    const data: Response<Foto> = await response.json()
    if (data.code !== 200) {
      setError(data.message)
      console.error('Error deleting order:', data.message)
      return
    }

    console.info(data.message)
    return data.data

  } catch (error) {
    setError('Error interno del servidor. Por favor intente de nuevo más tarde.')
    console.error('Error deleting order:', error)
  }
}
