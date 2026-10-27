export default function Asterisk({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 ${className}`}
      style={{
        WebkitMaskImage: 'url(/images/asterisk.svg)',
        maskImage: 'url(/images/asterisk.svg)',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
      }}
    />
  )
}
