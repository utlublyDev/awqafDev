
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class ProvidersDeleteCommandHandler : IRequestHandler<ProvidersDeleteCommand, Unit>
    {
        private IProvidersRepository _providersRepository;

        public ProvidersDeleteCommandHandler(
            IProvidersRepository providersRepository)
        {
            _providersRepository = providersRepository;
        }

        public async Task<Unit> Handle(ProvidersDeleteCommand command, CancellationToken cancellationToken)
        {
            await _providersRepository.DeleteByIdAsync(command.Id);
            await _providersRepository.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
