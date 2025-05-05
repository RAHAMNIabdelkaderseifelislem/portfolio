const Footer = () => {
  return (
    <footer className="py-6 border-t border-accent-lavender/20 bg-deep-indigo">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-cloud-white/70 text-sm">
              © {new Date().getFullYear()} Neural Nexus | AbdElKader Seif El Islem RAHMANI
            </p>
          </div>

          <div>
            <p className="text-cloud-white/70 text-sm">
              PhD Researcher • Deep Learning Engineer • Full-Stack AI Innovator
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
