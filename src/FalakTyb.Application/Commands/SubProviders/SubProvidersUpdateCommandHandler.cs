
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class SubProvidersUpdateCommandHandler : IRequestHandler<SubProvidersUpdateCommand, SubProviders>
    {
        private ISubProvidersRepository _subProvidersRepository;

        public SubProvidersUpdateCommandHandler(
            ISubProvidersRepository subProvidersRepository)
        {
            _subProvidersRepository = subProvidersRepository;
        }

        public async Task<SubProviders> Handle(SubProvidersUpdateCommand command, CancellationToken cancellationToken)
        {
            var entity = await _subProvidersRepository.CreateOrUpdateAsync(command.SubProviders);
            await _subProvidersRepository.SaveChangesAsync();
            return entity;
        }
    }
}
