"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Camera, CameraOff, CheckCircle2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface QrScannerProps {
  onScan: (data: string) => void
}

export function QrScanner({ onScan }: QrScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const scannerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isCleaningUpRef = useRef(false)
  const { toast } = useToast()

  useEffect(() => {
    // Check camera permissions on mount
    checkCameraPermissions()

    // Clean up on unmount
    return () => {
      cleanupScanner()
    }
  }, [])

  const cleanupScanner = async () => {
    if (isCleaningUpRef.current) return
    isCleaningUpRef.current = true

    try {
      if (scannerRef.current) {
        // Check if scanner is still scanning before stopping
        if (scannerRef.current.isScanning) {
          await scannerRef.current.stop()
        }

        // Clear the scanner reference
        scannerRef.current = null
      }

      // Clear the container content manually to avoid DOM conflicts
      if (containerRef.current) {
        const qrReaderElement = containerRef.current.querySelector("#qr-reader")
        if (qrReaderElement) {
          qrReaderElement.innerHTML = ""
        }
      }
    } catch (err) {
      // Silently handle cleanup errors
      console.warn("Scanner cleanup warning:", err)
    } finally {
      isCleaningUpRef.current = false
      setIsScanning(false)
    }
  }

  const checkCameraPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      stream.getTracks().forEach((track) => track.stop())
      setHasPermission(true)
    } catch (err) {
      setHasPermission(false)
      setError("Camera permission denied. Please allow camera access to scan QR codes.")
    }
  }

  const startScanner = async () => {
    if (!containerRef.current || hasPermission === false || isScanning) return

    try {
      setError(null)

      // Clean up any existing scanner first
      await cleanupScanner()

      // Wait a bit for cleanup to complete
      await new Promise((resolve) => setTimeout(resolve, 100))

      // Dynamically import html5-qrcode to avoid SSR issues
      const { Html5Qrcode } = await import("html5-qrcode")

      // Create a unique ID for this scanner instance
      const scannerId = `qr-reader-${Date.now()}`

      // Update the container with the new ID
      const qrReaderElement = containerRef.current.querySelector("#qr-reader")
      if (qrReaderElement) {
        qrReaderElement.id = scannerId
      }

      const html5QrCode = new Html5Qrcode(scannerId)
      scannerRef.current = html5QrCode

      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        (decodedText) => {
          // Successfully scanned QR code
          toast({
            title: "QR Code Scanned!",
            description: `Scanned: ${decodedText}`,
          })
          onScan(decodedText)
          stopScanner()
        },
        (errorMessage) => {
          // Ignore common scanning errors that occur when no QR code is detected
          if (
            !errorMessage.includes("No MultiFormat Readers") &&
            !errorMessage.includes("QR code not found") &&
            !errorMessage.includes("NotFoundException")
          ) {
            console.warn("QR Scanner error:", errorMessage)
          }
        },
      )
      setIsScanning(true)
    } catch (err: any) {
      let errorMsg = "Failed to start camera."

      if (err.name === "NotAllowedError") {
        errorMsg = "Camera permission denied. Please allow camera access."
      } else if (err.name === "NotFoundError") {
        errorMsg = "No camera found on this device."
      } else if (err.name === "NotSupportedError") {
        errorMsg = "Camera not supported on this device."
      }

      setError(errorMsg)
      console.error("Scanner start error:", err)
      setIsScanning(false)
    }
  }

  const stopScanner = async () => {
    await cleanupScanner()
  }

  // Simulate QR code scan for demo purposes
  const simulateScan = () => {
    const mockQRCode = `PLASTIC-QR-2025-${String(Math.floor(Math.random() * 9999)).padStart(4, "0")}`
    toast({
      title: "QR Code Scanned! (Demo)",
      description: `Scanned: ${mockQRCode}`,
    })
    onScan(mockQRCode)
  }

  if (hasPermission === null) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="w-full max-w-[300px] h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Checking camera permissions...</p>
          </div>
        </div>
      </div>
    )
  }

  if (hasPermission === false) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="w-full max-w-[300px] h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center p-4">
            <CameraOff className="h-12 w-12 text-red-400 mx-auto mb-2" />
            <p className="text-sm text-red-600 mb-4">Camera access required</p>
            <Button onClick={checkCameraPermissions} variant="outline" size="sm">
              Retry Permission
            </Button>
          </div>
        </div>
        <Button onClick={simulateScan} className="bg-green-600 hover:bg-green-700">
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Demo Scan (for testing)
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div ref={containerRef} className="w-full max-w-[300px] h-[300px] bg-gray-100 rounded-lg overflow-hidden">
        <div id="qr-reader" className="w-full h-full">
          {!isScanning && (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Click start to begin scanning</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {error && <div className="text-red-500 text-sm text-center max-w-[300px]">{error}</div>}

      <div className="flex flex-col items-center gap-2">
        {!isScanning ? (
          <Button onClick={startScanner} className="bg-green-600 hover:bg-green-700" disabled={isCleaningUpRef.current}>
            <Camera className="mr-2 h-4 w-4" />
            Start Scanner
          </Button>
        ) : (
          <Button onClick={stopScanner} variant="outline" disabled={isCleaningUpRef.current}>
            <CameraOff className="mr-2 h-4 w-4" />
            Stop Scanner
          </Button>
        )}

        {/* Demo button for testing */}
        <Button onClick={simulateScan} variant="ghost" size="sm" className="text-xs">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Demo Scan (for testing)
        </Button>
      </div>

      {isScanning && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Point your camera at a QR code to scan</p>
          <p className="text-xs text-muted-foreground mt-1">Make sure the QR code is well-lit and clearly visible</p>
        </div>
      )}
    </div>
  )
}
