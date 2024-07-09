
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class FrequentlyAskedQuestionsCreateCommandHandler : IRequestHandler<FrequentlyAskedQuestionsCreateCommand, FrequentlyAskedQuestions>
    {
        private IFrequentlyAskedQuestionsRepository _frequentlyAskedQuestionsRepository;

        public FrequentlyAskedQuestionsCreateCommandHandler(
            IFrequentlyAskedQuestionsRepository frequentlyAskedQuestionsRepository)
        {
            _frequentlyAskedQuestionsRepository = frequentlyAskedQuestionsRepository;
        }

        public async Task<FrequentlyAskedQuestions> Handle(FrequentlyAskedQuestionsCreateCommand command, CancellationToken cancellationToken)
        {
            var entity = await _frequentlyAskedQuestionsRepository.CreateOrUpdateAsync(command.FrequentlyAskedQuestions);
            await _frequentlyAskedQuestionsRepository.SaveChangesAsync();
            return entity;
        }
    }
}
