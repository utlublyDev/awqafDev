
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;

namespace awqaf.Application.Queries
{
    public class NewCompanyGetAllQueryHandler : IRequestHandler<NewCompanyGetAllQuery, IPage<NewCompany>>
    {
        private IReadOnlyNewCompanyRepository _newCompanyRepository;

        public NewCompanyGetAllQueryHandler(
            IReadOnlyNewCompanyRepository newCompanyRepository)
        {
            _newCompanyRepository = newCompanyRepository;
        }

        public async Task<IPage<NewCompany>> Handle(NewCompanyGetAllQuery request, CancellationToken cancellationToken)
        {
            var page = await _newCompanyRepository.QueryHelper()
                .GetPageAsync(request.Page);
            return page;
        }
    }
}
