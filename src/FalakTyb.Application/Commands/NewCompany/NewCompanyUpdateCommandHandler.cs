
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class NewCompanyUpdateCommandHandler : IRequestHandler<NewCompanyUpdateCommand, NewCompany>
    {
        private INewCompanyRepository _newCompanyRepository;

        public NewCompanyUpdateCommandHandler(
            INewCompanyRepository newCompanyRepository)
        {
            _newCompanyRepository = newCompanyRepository;
        }

        public async Task<NewCompany> Handle(NewCompanyUpdateCommand command, CancellationToken cancellationToken)
        {
            var entity = await _newCompanyRepository.CreateOrUpdateAsync(command.NewCompany);
            await _newCompanyRepository.SaveChangesAsync();
            return entity;
        }
    }
}
