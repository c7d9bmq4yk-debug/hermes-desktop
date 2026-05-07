import { X, ChevronLeft, ChevronRight, HelpCircle, BookOpen, MessageCircle } from 'lucide-react'
import { useAppStore } from '../../store/appStore'

function GuideOverlay() {
  const { guideSteps, currentGuideStep, nextGuideStep, prevGuideStep, closeGuide } = useAppStore()
  
  const currentStep = guideSteps[currentGuideStep]
  const isFirstStep = currentGuideStep === 0
  const isLastStep = currentGuideStep === guideSteps.length - 1

  const handleClose = () => {
    localStorage.setItem('hasSeenGuide', 'true')
    closeGuide()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      <div className="relative bg-bg-secondary border border-border rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden animate-[fadeIn_0.3s_ease-out]">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary" />
        
        <div className="p-6">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1 rounded-lg hover:bg-bg-tertiary text-text-secondary hover:text-text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-center mb-2">
            <div className="flex gap-1">
              {guideSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentGuideStep 
                      ? 'w-8 bg-primary' 
                      : index < currentGuideStep 
                        ? 'w-8 bg-primary/30' 
                        : 'w-4 bg-bg-tertiary'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center text-center py-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 border border-primary/30">
              {currentGuideStep === 0 ? (
                <HelpCircle className="w-8 h-8 text-primary" />
              ) : currentGuideStep === guideSteps.length - 1 ? (
                <BookOpen className="w-8 h-8 text-secondary" />
              ) : (
                <MessageCircle className="w-8 h-8 text-primary" />
              )}
            </div>
            
            <h2 className="text-xl font-bold text-text-primary mb-2">
              {currentStep.title}
            </h2>
            
            <p className="text-text-secondary text-sm leading-relaxed">
              {currentStep.description}
            </p>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prevGuideStep}
              disabled={isFirstStep}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isFirstStep 
                  ? 'text-text-disabled cursor-not-allowed' 
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>上一步</span>
            </button>

            <button
              onClick={isLastStep ? handleClose : nextGuideStep}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <span>{isLastStep ? '完成' : '下一步'}</span>
              {!isLastStep && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>

          {isLastStep && (
            <p className="text-center text-xs text-text-disabled mt-4">
              您可以随时点击右上角的帮助按钮重新查看此引导
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default GuideOverlay
