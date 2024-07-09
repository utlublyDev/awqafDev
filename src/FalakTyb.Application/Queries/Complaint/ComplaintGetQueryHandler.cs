
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Queries
{
    public class ComplaintGetQueryHandler : IRequestHandler<ComplaintGetQuery, Complaint>
    {
        private IReadOnlyComplaintRepository _complaintRepository;

        public ComplaintGetQueryHandler(
            IReadOnlyComplaintRepository complaintRepository)
        {
            _complaintRepository = complaintRepository;
        }

        public async Task<Complaint> Handle(ComplaintGetQuery request, CancellationToken cancellationToken)
        {
            var entity = await _complaintRepository.QueryHelper()
                .GetOneAsync(complaint => complaint.Id == request.Id);
            return entity;
        }
    }
}
