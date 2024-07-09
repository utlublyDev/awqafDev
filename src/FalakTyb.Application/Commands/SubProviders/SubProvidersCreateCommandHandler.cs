
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class SubProvidersCreateCommandHandler : IRequestHandler<SubProvidersCreateCommand, SubProviders>
    {
        private ISubProvidersRepository _subProvidersRepository;

        public SubProvidersCreateCommandHandler(
            ISubProvidersRepository subProvidersRepository)
        {
            _subProvidersRepository = subProvidersRepository;
        }

        public async Task<SubProviders> Handle(SubProvidersCreateCommand command, CancellationToken cancellationToken)
        {
            var entity = await _subProvidersRepository.CreateOrUpdateAsync(command.SubProviders);
            await _subProvidersRepository.SaveChangesAsync();
            return entity;
        }
    }
}
