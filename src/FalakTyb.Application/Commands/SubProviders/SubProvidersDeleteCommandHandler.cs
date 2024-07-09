
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class SubProvidersDeleteCommandHandler : IRequestHandler<SubProvidersDeleteCommand, Unit>
    {
        private ISubProvidersRepository _subProvidersRepository;

        public SubProvidersDeleteCommandHandler(
            ISubProvidersRepository subProvidersRepository)
        {
            _subProvidersRepository = subProvidersRepository;
        }

        public async Task<Unit> Handle(SubProvidersDeleteCommand command, CancellationToken cancellationToken)
        {
            await _subProvidersRepository.DeleteByIdAsync(command.Id);
            await _subProvidersRepository.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
