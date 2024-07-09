
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class ProvidersUpdateCommandHandler : IRequestHandler<ProvidersUpdateCommand, Providers>
    {
        private IProvidersRepository _providersRepository;

        public ProvidersUpdateCommandHandler(
            IProvidersRepository providersRepository)
        {
            _providersRepository = providersRepository;
        }

        public async Task<Providers> Handle(ProvidersUpdateCommand command, CancellationToken cancellationToken)
        {
            var entity = await _providersRepository.CreateOrUpdateAsync(command.Providers);
            await _providersRepository.SaveChangesAsync();
            return entity;
        }
    }
}
