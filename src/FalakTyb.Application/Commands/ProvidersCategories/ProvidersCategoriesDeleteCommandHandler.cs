
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class ProvidersCategoriesDeleteCommandHandler : IRequestHandler<ProvidersCategoriesDeleteCommand, Unit>
    {
        private IProvidersCategoriesRepository _providersCategoriesRepository;

        public ProvidersCategoriesDeleteCommandHandler(
            IProvidersCategoriesRepository providersCategoriesRepository)
        {
            _providersCategoriesRepository = providersCategoriesRepository;
        }

        public async Task<Unit> Handle(ProvidersCategoriesDeleteCommand command, CancellationToken cancellationToken)
        {
            await _providersCategoriesRepository.DeleteByIdAsync(command.Id);
            await _providersCategoriesRepository.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
