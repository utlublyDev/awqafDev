
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class FrequentlyAskedQuestionsUpdateCommandHandler : IRequestHandler<FrequentlyAskedQuestionsUpdateCommand, FrequentlyAskedQuestions>
    {
        private IFrequentlyAskedQuestionsRepository _frequentlyAskedQuestionsRepository;

        public FrequentlyAskedQuestionsUpdateCommandHandler(
            IFrequentlyAskedQuestionsRepository frequentlyAskedQuestionsRepository)
        {
            _frequentlyAskedQuestionsRepository = frequentlyAskedQuestionsRepository;
        }

        public async Task<FrequentlyAskedQuestions> Handle(FrequentlyAskedQuestionsUpdateCommand command, CancellationToken cancellationToken)
        {
            var entity = await _frequentlyAskedQuestionsRepository.CreateOrUpdateAsync(command.FrequentlyAskedQuestions);
            await _frequentlyAskedQuestionsRepository.SaveChangesAsync();
            return entity;
        }
    }
}
