
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class NewCompanyDeleteCommandHandler : IRequestHandler<NewCompanyDeleteCommand, Unit>
    {
        private INewCompanyRepository _newCompanyRepository;

        public NewCompanyDeleteCommandHandler(
            INewCompanyRepository newCompanyRepository)
        {
            _newCompanyRepository = newCompanyRepository;
        }

        public async Task<Unit> Handle(NewCompanyDeleteCommand command, CancellationToken cancellationToken)
        {
            await _newCompanyRepository.DeleteByIdAsync(command.Id);
            await _newCompanyRepository.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
