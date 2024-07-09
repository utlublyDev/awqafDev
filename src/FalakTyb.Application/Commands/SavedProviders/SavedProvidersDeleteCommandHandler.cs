
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
namespace awqaf.Application.Commands
{
    public class SavedProvidersDeleteCommandHandler : IRequestHandler<SavedProvidersDeleteCommand, Unit>
    {
        private ISavedProvidersRepository _savedProvidersRepository;

        public SavedProvidersDeleteCommandHandler(
            ISavedProvidersRepository savedProvidersRepository)
        {
            _savedProvidersRepository = savedProvidersRepository;
        }

        public async Task<Unit> Handle(SavedProvidersDeleteCommand command, CancellationToken cancellationToken)
        {
           IEnumerable<SavedProviders> data = await _savedProvidersRepository.QueryHelper().Filter(x=>(x.ProviderId==command.Id.ToString()&&x.UserIdAwqaf==command.AwaqafUserId.ToString())||(x.OfferId==command.Id.ToString()&&x.UserIdAwqaf==command.AwaqafUserId)).GetAllAsync();


            long toBeDeleted = data.First().Id;

            await _savedProvidersRepository.DeleteByIdAsync(toBeDeleted);
            await _savedProvidersRepository.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
