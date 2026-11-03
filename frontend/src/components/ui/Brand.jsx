export default function Brand({ light = false }) {
  return <div className={`brand-wordmark ${light ? 'brand-wordmark-light' : ''}`}>Focus<span>Hub</span></div>
}
