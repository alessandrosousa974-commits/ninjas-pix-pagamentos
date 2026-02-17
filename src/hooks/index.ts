// Permissões Básicas
export { usePermission } from './use-permissions'
export type { PermissionType, PermissionStatus } from './use-permissions'

export { useCamera } from './use-camera'
export type { UseCameraOptions } from './use-camera'

export { useGeolocation } from './use-geolocation'
export type { GeolocationCoordinates, GeolocationState, UseGeolocationOptions } from './use-geolocation'

export { useMicrophone } from './use-microphone'
export type { UseMicrophoneOptions } from './use-microphone'

export { useNotifications } from './use-notifications'
export type { NotificationOptions, NotificationPermission } from './use-notifications'

export { useClipboard } from './use-clipboard'

export { useFileUpload } from './use-file-upload'
export type { UploadedFile, UseFileUploadOptions } from './use-file-upload'

// Recursos Avançados
export { useContacts } from './use-contacts'
export type { Contact } from './use-contacts'

export { useShare } from './use-share'
export type { ShareData } from './use-share'

export { useVibration } from './use-vibration'

export { useBattery } from './use-battery'
export type { BatteryState } from './use-battery'

export { useNetwork } from './use-network'
export type { NetworkState } from './use-network'

export { useScreenOrientation } from './use-screen-orientation'
export type { OrientationType, ScreenOrientationState } from './use-screen-orientation'

// Hook existente
export { useMobile } from './use-mobile'
