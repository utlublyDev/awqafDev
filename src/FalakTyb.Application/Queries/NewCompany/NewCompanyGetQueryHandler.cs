
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Queries
{
    public class NewCompanyGetQueryHandler : IRequestHandler<NewCompanyGetQuery, NewCompany>
    {
        private IReadOnlyNewCompanyRepository _newCompanyRepository;

        public NewCompanyGetQueryHandler(
            IReadOnlyNewCompanyRepository newCompanyRepository)
        {
            _newCompanyRepository = newCompanyRepository;
        }

        public async Task<NewCompany> Handle(NewCompanyGetQuery request, CancellationToken cancellationToken)
        {
            var entity = await _newCompanyRepository.QueryHelper()
                .GetOneAsync(newCompany => newCompany.Id == request.Id);
            return entity;
        }
    }
}
