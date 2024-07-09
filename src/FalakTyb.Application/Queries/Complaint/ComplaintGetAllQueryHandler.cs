
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;

namespace awqaf.Application.Queries
{
    public class ComplaintGetAllQueryHandler : IRequestHandler<ComplaintGetAllQuery, IPage<Complaint>>
    {
        private IReadOnlyComplaintRepository _complaintRepository;

        public ComplaintGetAllQueryHandler(
            IReadOnlyComplaintRepository complaintRepository)
        {
            _complaintRepository = complaintRepository;
        }

        public async Task<IPage<Complaint>> Handle(ComplaintGetAllQuery request, CancellationToken cancellationToken)
        {
            var page = await _complaintRepository.QueryHelper()
                .GetPageAsync(request.Page);
            return page;
        }
    }
}
