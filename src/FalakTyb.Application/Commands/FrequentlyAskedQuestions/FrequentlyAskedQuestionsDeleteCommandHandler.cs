
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class FrequentlyAskedQuestionsDeleteCommandHandler : IRequestHandler<FrequentlyAskedQuestionsDeleteCommand, Unit>
    {
        private IFrequentlyAskedQuestionsRepository _frequentlyAskedQuestionsRepository;

        public FrequentlyAskedQuestionsDeleteCommandHandler(
            IFrequentlyAskedQuestionsRepository frequentlyAskedQuestionsRepository)
        {
            _frequentlyAskedQuestionsRepository = frequentlyAskedQuestionsRepository;
        }

        public async Task<Unit> Handle(FrequentlyAskedQuestionsDeleteCommand command, CancellationToken cancellationToken)
        {
            await _frequentlyAskedQuestionsRepository.DeleteByIdAsync(command.Id);
            await _frequentlyAskedQuestionsRepository.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
